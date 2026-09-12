import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background text-foreground">
    <title>404: Page Not Found | Bifurkate</title>
    <h1 className="text-5xl font-bold">404</h1>
    <p className="text-lg text-muted-foreground">You just hit a route that doesn't exist&hellip; the sadness. 😢</p>
    <Link to="/" className="text-lg font-medium text-primary underline underline-offset-2">
      Back to safety
    </Link>
  </main>
);

export default NotFound;
