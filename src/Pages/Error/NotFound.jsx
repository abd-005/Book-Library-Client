import React, { useEffect } from "react";
import { Link } from "react-router";
import MyContainer from "../../components/MyContainer";

const NotFound = () => {
useEffect(() => {
document.title = "404 - Page Not Found - The Book Heaven";
}, []);

return (
<div className="min-h-screen flex items-center justify-center">
<MyContainer>
<div className="text-center">
<h1 className="text-9xl font-bold text-base-content mb-4">404</h1>
<h2 className="text-4xl font-semibold text-base-content mb-6">
Page Not Found
</h2>
<p className="text-lg text-slate-500 mb-8 max-w-md mx-auto">
Sorry, the page you are looking for doesn't exist. It might have
been moved or deleted.
</p>
<Link
to="/"
className="px-8 py-3 rounded-md font-semibold transition-colors inline-block"
>
Go Back Home
</Link>
</div>
</MyContainer>
</div>
);
};

export default NotFound;