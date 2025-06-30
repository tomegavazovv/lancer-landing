# Zapier Webhook Integration Documentation

## Overview
This implementation adds Zapier webhook functionality to the hero section's email capture form. When users enter their email and click "Access Launch Offer", the email is sent to a Zapier webhook for processing via a server-side API route to avoid CORS issues.

## Implementation Details

### Files Created/Modified
1. **`src/components/blocks/hero-section-1.tsx`** - Main hero section component with form
2. **`src/lib/config.ts`** - Configuration and webhook utility functions
3. **`src/app/api/webhook/zapier/route.ts`** - Next.js API route for server-side webhook calls

### Architecture
```
Client Form → Internal API Route → Zapier Webhook
```

This architecture avoids CORS issues by making the external webhook call from the server-side instead of directly from the browser.

### Key Features

#### Form Functionality
- Email validation (format and required field validation)
- Loading states during submission
- Success/error feedback messages
- Form disabling after successful submission
- Auto-scroll to pricing section after success

#### API Route (`/api/webhook/zapier`)
- Server-side validation of email format and required fields
- Forwards requests to Zapier webhook
- Proper error handling and status codes
- JSON response format

#### Webhook Integration
- POST request to internal API route (`/api/webhook/zapier`)
- API route forwards to Zapier webhook URL
- Structured payload with email, timestamp, and source
- Error handling for network issues
- Retry-friendly implementation

### Payload Format
**Client → API Route:**
```javascript
{
  email: "user@example.com",
  timestamp: "2025-01-30T10:30:00Z",
  source: "hero_cta"
}
```

**API Route → Zapier:**
```javascript
{
  email: "user@example.com",
  timestamp: "2025-01-30T10:30:00Z",
  source: "hero_cta"
}
```

### API Response Format
**Success:**
```javascript
{
  success: true,
  message: "Email submitted successfully",
  zapierResponse: { /* Zapier response data */ }
}
```

**Error:**
```javascript
{
  error: "Error message description"
}
```

### User Experience Flow
1. User enters email in the hero section form
2. Clicks "Access Launch Offer" button
3. Form validates email format client-side
4. Shows loading spinner during submission
5. Request sent to `/api/webhook/zapier`
6. API route validates and forwards to Zapier
7. On success: Shows success message and scrolls to pricing
8. On error: Shows error message and allows retry

### Environment Configuration
The webhook URL can be configured via environment variable:
```bash
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/18009054/ubw5ltp/
```

If not set, it defaults to the provided Zapier webhook URL.

### Error Handling
- Client-side email validation
- Server-side validation in API route
- Network error handling (both client and server)
- User-friendly error messages
- Console logging for debugging
- Graceful fallback behavior

### State Management
The component manages the following states:
- `email` - Current email input value
- `isSubmitting` - Loading state during webhook call
- `submitStatus` - Success/error/idle status
- `errorMessage` - Specific error message to display

### TypeScript Types
```typescript
interface WebhookPayload {
  email: string;
  timestamp: string;
  source: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  zapierResponse?: any;
}
```

## Testing
To test the webhook integration:
1. Enter a valid email in the hero form
2. Click "Access Launch Offer"
3. Check browser network tab for the POST request to `/api/webhook/zapier`
4. Check server logs for the forwarded request to Zapier
5. Verify the webhook receives the expected payload format
6. Test error scenarios (invalid email, network issues)

## CORS Solution
The original implementation had CORS issues when calling Zapier directly from the browser. This has been resolved by:
1. Creating a Next.js API route (`/api/webhook/zapier`)
2. Making the external webhook call from the server-side
3. The client now calls the internal API route, which has no CORS restrictions

## Notes
- The webhook URL is configured via environment variables on the server-side
- The implementation uses Next.js API routes for server-side processing
- Client-side uses native `fetch()` API for maximum compatibility
- Form submission prevents default browser behavior
- Success state includes automatic scrolling to pricing section for better UX
- All validation happens both client-side and server-side for security 