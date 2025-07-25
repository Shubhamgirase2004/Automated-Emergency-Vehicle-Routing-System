// import React, { useState } from 'react';
// import SignupForm from '../components/auth/SignupForm';
// import LoginForm from '../components/auth/LoginForm';

// export default function AuthPage() {
//   const [showSignup, setShowSignup] = useState(true);

//   const toggleForm = () => {
//     setShowSignup(prev => !prev);
//   };

//   return (
//     <div>
//       {showSignup ? <SignupForm onToggleForm={toggleForm} /> : <LoginForm onToggleForm={toggleForm} />}
//     </div>
//   );
// }