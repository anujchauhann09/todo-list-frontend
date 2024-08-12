import React from 'react';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
    return (
        <div className="privacy-policy-container">
            <div className="privacy-policy">
                <h1>Privacy Policy</h1>
                <p>Effective Date: 12-08-2024</p>

                <section className='section'>
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to Todo Hub App. We value your privacy and are committed to protecting your personal data.
                        This Privacy Policy explains how we collect, use, and share information about you when you use our website
                        and services.
                    </p>
                </section>

                <section className='section'>
                    <h2>2. Information We Collect</h2>
                    <p>
                        We collect the following types of information:
                    </p>
                    <ul>
                        <li><strong>Personal Information:</strong> Information you provide directly, such as your name, email address, and other contact details.</li>
                        <li><strong>Usage Data:</strong> Information about how you interact with our app, including IP addresses, browser types, and pages visited.</li>
                        <li><strong>Cookies:</strong> Small data files stored on your device that help us improve your experience and track user behavior.</li>
                    </ul>
                </section>

                <section className='section'>
                    <h2>3. How We Use Your Information</h2>
                    <p>
                        We use the information we collect for the following purposes:
                    </p>
                    <ul>
                        <li>To provide and maintain our services.</li>
                        <li>To communicate with you, including sending updates and promotional information.</li>
                        <li>To improve our app and services based on user feedback and usage data.</li>
                    </ul>
                </section>

                <section className='section'>
                    <h2>4. How We Share Your Information</h2>
                    <p>
                        We do not share your personal information with third parties except in the following cases:
                    </p>
                    <ul>
                        <li><strong>With Your Consent:</strong> We may share information if you have given us explicit permission.</li>
                        <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to comply with legal processes.</li>
                    </ul>
                </section>

                <section className='section'>
                    <h2>5. Security</h2>
                    <p>
                        We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or destruction.
                    </p>
                </section>
                {/*
                <section className='section'>
                    <h2>6. Your Rights</h2>
                    <p>
                        You have the following rights regarding your personal data:
                    </p>
                    <ul>
                        <li>The right to access and correct your personal information.</li>
                        <li>The right to request the deletion of your personal information.</li>
                        <li>The right to object to or restrict the processing of your personal data.</li>
                    </ul>
                </section>
                */}

                <section className='section'>
                    <h2>6. Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website.
                    </p>
                </section>

                <section className='section'>
                    <h2>7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at:
                        <br />
                        Email: todo.hub.app@gmail.com
                    </p>
                </section>
            </div>
        </div>
    );
}
