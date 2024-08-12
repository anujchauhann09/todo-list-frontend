import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
    return (
        <div className="terms-of-service-container">
            <div className="terms-of-service">
                <header>
                    <h1>Terms of Service</h1>
                </header>

                <section className="section">
                    <h2>1. Introduction</h2>
                    <p>Welcome to our Todo App. These Terms of Service govern your use of our application. By using our service, you agree to these terms. Please read them carefully.</p>

                    <h2>2. User Responsibilities</h2>
                    <p>As a user, you agree to:</p>
                    <ul>
                        <li>Provide accurate and complete information during registration.</li>
                        <li>Use the service in compliance with all applicable laws and regulations.</li>
                        <li>Not engage in any activity that may disrupt or interfere with the service.</li>
                    </ul>

                    <h2>3. Privacy and Data Protection</h2>
                    <p>We value your privacy and are committed to protecting your personal information. Our <a href="/privacy-policy">Privacy Policy</a> provides detailed information on how we collect, use, and safeguard your data.</p>

                    <h2>4. Intellectual Property</h2>
                    <p>All content and materials provided by the Todo App, including but not limited to text, graphics, logos, and software, are the property of the Todo App or its licensors and are protected by intellectual property laws.</p>

                    <h2>5. Limitation of Liability</h2>
                    <p>The Todo App is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the functionality, availability, or reliability of the service. Your use of the service is at your own risk.</p>

                    <h2>6. Changes to the Terms</h2>
                    <p>We may update these Terms of Service from time to time. We will notify you of any significant changes by posting the new terms on this page. Your continued use of the service after any changes constitutes acceptance of the new terms.</p>

                    <h2>7. Contact Us</h2>
                    <p>If you have any questions or concerns about these Terms of Service, please contact us at <a href="mailto:todo.hub.app@gmail.com">todo.hub.app@gmail.com</a>.</p>
                </section>
            </div>
        </div>
    );
};

export default TermsOfService;
