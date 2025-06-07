document.getElementById("loanForm").addEventListener("submit", async function(e) {
    e.preventDefault();
  
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '<div class="spinner"></div>';
    resultDiv.className = "";  // reset classes while loading
  
    const formData = new FormData(e.target);
    const applicant = {};
    formData.forEach((val, key) => {
      applicant[key] = val;
    });
  
    const prompt = `
  You are a loan officer AI. Given the applicant information below, classify the loan application as one of the following: "Approved", "Approved with Caution", or "Denied".
  Respond with only one of those three exactly.
  
  Applicant information:
  - Gender: ${applicant.Gender}
  - Married: ${applicant.Married}
  - Dependents: ${applicant.Dependents}
  - Education: ${applicant.Education}
  - Self Employed: ${applicant.Self_Employed}
  - Applicant Income (annual): ${applicant.ApplicantIncome}
  - Coapplicant Income (annual): ${applicant.CoapplicantIncome}
  - Loan Amount: ${applicant.LoanAmount}
  - Loan Amount Term (days): ${applicant.Loan_Amount_Term}
  - Credit History (300-900): ${applicant.Credit_History}
  - Collateral: ${applicant.Collateral}
  - Loan Purpose: ${applicant.LoanPurpose}
  `;
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // IMPORTANT: Replace with your own OpenAI API key
          "Authorization": "Bearer OPEN_AI_KEY"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 10,
          temperature: 0
        }),
      });
  
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || "Denied";
  
      const emojiMap = {
        "Approved": "✅",
        "Approved with Caution": "⚠️",
        "Denied": "❌"
      };
  
      const classMap = {
        "Approved": "approved",
        "Approved with Caution": "caution",
        "Denied": "denied"
      };
  
      const emoji = emojiMap[reply] || "";
      const statusClass = classMap[reply] || "denied";
  
      resultDiv.className = statusClass;
      resultDiv.innerHTML = `<span class="emoji">${emoji}</span> Loan Status: ${reply}`;
    } catch (err) {
      console.error(err);
      resultDiv.className = "denied";
      resultDiv.textContent = "⚠️ Error predicting loan status.";
    }
  });
  
