import { getServerSession } from 'next-auth';
import { Card } from '@tremor/react';
import NotLogin from '../notLogin';

export default async function SettingsPage() {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Card className="mt-6">
          <NotLogin callbackUrl="/settings" />
        </Card>
      </main>
    );
  }
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900">Settings</h2>
            <p className="mt-2 text-sm text-gray-500">
              Change your preferences.
            </p>
            <dl className="mt-8 text-sm text-gray-600">
              <div className="mt-6">
                <dt className="text-lg font-medium text-gray-900">Profile</dt>
                <dd className="mt-2">
                  <p className="text-gray-500">Some info about you.</p>
                </dd>
              </div>
              <div className="mt-6">
                <dt className="text-lg font-medium text-gray-900">Account</dt>
                <dd className="mt-2">
                  <p className="text-gray-500">Change your password.</p>
                </dd>
              </div>
              <div className="mt-6">
                <dt className="text-lg font-medium text-gray-900">
                  Notifications
                </dt>
                <dd className="mt-2">
                  <p className="text-gray-500">
                    We&apos;ll let you know about important changes.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
