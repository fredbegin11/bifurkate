import React from 'react';
import { Link } from 'gatsby';

const Privacy = () => (
  <div className="container">
    <div className="section-inner">
      <h2>Privacy Policy</h2>
      <p>Your privacy is important to us.</p>
      <p>
        It is Birfurkate's policy to respect your privacy and this is why we don't collect any information from your Strava profile. We use Strava's api to fetch your activity data
        and athlete profile but we do not store nor retain any information we obtain from it.
      </p>
      <p>
        Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data"). This Log Data may include information such as your
        computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those
        pages and other statistics. In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this information to improve our
        platform.
      </p>
      <p>
        Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept
        responsibility or liability for their respective privacy policies.
      </p>
      <p>
        Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle
        user data and personal information, feel free to contact us.
      </p>
      <p>This policy is effective as of 30 June 2020.</p>
      <p style={{ textAlign: 'center' }}>
        <Link to="/">Go back to Bifurkate</Link>
      </p>
    </div>
  </div>
);

export default Privacy;
