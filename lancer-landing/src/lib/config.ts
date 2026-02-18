export const config = {
  apiPlaybookLeadUrl: '/api/playbook-lead',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

export interface PlaybookLeadPayload {
  email: string;
  upworkUrl?: string;
  linkedinUrl?: string;
  source: string;
}

export const submitPlaybookLead = async (
  payload: PlaybookLeadPayload
): Promise<boolean> => {
  try {
    const response = await fetch(config.apiPlaybookLeadUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Lead submission error:', error);
    return false;
  }
};
