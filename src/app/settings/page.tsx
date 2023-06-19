export default function SettingsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-900">Settings</h2>
          <p className="mt-2 text-sm text-gray-500">Change your preferences.</p>
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
  );
}
