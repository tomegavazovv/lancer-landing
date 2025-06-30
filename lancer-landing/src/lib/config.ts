// Configuration file for environment-dependent settings
export const config = {
  // Use internal API route instead of direct Zapier call to avoid CORS
  apiWebhookUrl: '/api/webhook/zapier',
  
  // Add other configuration values here as needed
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

// Type for webhook payload
export interface WebhookPayload {
  email: string;
  timestamp: string;
  source: string;
}

// Type for API response
export interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  zapierResponse?: any;
}

// Webhook submission function - now calls internal API route
export const submitToZapier = async (payload: WebhookPayload): Promise<boolean> => {
  try {
    const response = await fetch(config.apiWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData: ApiResponse = await response.json();
      console.error('API error:', errorData.error);
      return false;
    }

    const data: ApiResponse = await response.json();
    console.log('Webhook submission successful:', data.message);
    return data.success || false;
  } catch (error) {
    console.error('Webhook submission error:', error);
    return false;
  }
}; 