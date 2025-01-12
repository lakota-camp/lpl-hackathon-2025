export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="dashboard-layout">
        <aside className="w-64 bg-gray-100 p-4">
          <nav>
            <ul>
              <li>Overview</li>
              <li>Settings</li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4">{children}</main>
      </div>
    );
  }
  