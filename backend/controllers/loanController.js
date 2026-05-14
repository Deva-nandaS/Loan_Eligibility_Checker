const loanEligibility = require("./utils/LoanEligibility");
const loanController = (req,res,applicant) => {
    const finalRate=applicant.credit +applicant.emptype.rate+applicant.purpose.rate;

const monthlyInterest= ((finalRate)/100)/12
const first=(applicant.amount *monthlyInterest*Math.pow((1+monthlyInterest),applicant.tenure))
    const  second=Math.pow((1+monthlyInterest),tenure)-1
    const emi=first/second;

};
