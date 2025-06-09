**Loan Application Classifier**
A simple web app that predicts loan application outcomes using OpenAI’s GPT-4o-mini model. Users fill out a loan form, and an AI-powered loan officer classifies the application as Approved, Approved with Caution, or Denied in real time.

**Features**
Responsive loan application form collecting applicant details

Async submission to OpenAI API for loan classification

Clear visual feedback with emojis and color-coded results

Loading spinner while awaiting API response

Styled with modern, clean UI and smooth interactions

**How It Works**
User fills out the loan form and submits it.

The form submission is intercepted with JavaScript (preventDefault()) to avoid page reload.

Form data is collected and formatted into a prompt for OpenAI’s chat completion API.

The AI model classifies the loan as one of three statuses:

Approved ✅

Approved with Caution ⚠️

Denied ❌

The result is displayed dynamically with color-coded styling and emojis.

Errors are handled gracefully, showing an error message if prediction fails.
