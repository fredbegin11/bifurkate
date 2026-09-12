import { Link } from 'react-router-dom';

const Privacy = () => (
  <main className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 bg-background px-6 py-16 text-foreground">
    <title>Privacy Policy | Bifurkate</title>

    <h1 className="text-3xl font-bold">Privacy Policy</h1>

    <p className="text-lg text-muted-foreground">Your privacy is important to us.</p>

    <p className="text-base text-muted-foreground">
      It's Bifurkate's policy to respect your privacy and this is why we don't collect any information from your Strava
      profile. We use Strava's API to fetch your activity data and athlete profile, but we do not store nor retain any
      information we obtain from it.
    </p>

    <p className="text-base text-muted-foreground">
      Like many site operators, we collect information that your browser sends whenever you visit our site ("log data").
      This log data may include information such as your computer's IP address, browser type and version, the pages of
      our site that you visit, and the time and date of your visit.
    </p>

    <p className="text-base text-muted-foreground">
      Our website may link to external sites that are not operated by us. Please be aware that we have no control over
      the content and practices of these sites, and cannot accept responsibility or liability for their respective
      privacy policies.
    </p>

    <p className="text-base text-muted-foreground">
      Your continued use of our website will be regarded as acceptance of our practices around privacy and personal
      information. If you have any questions about how we handle user data and personal information, feel free to
      contact us.
    </p>

    <Link to="/" className="text-lg font-medium text-primary underline underline-offset-2">
      Go back to Bifurkate
    </Link>
  </main>
);

export default Privacy;
