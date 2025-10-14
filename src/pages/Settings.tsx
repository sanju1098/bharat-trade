import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Smith");
  const [email, setEmail] = useState("john.smith@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");

  useEffect(() => {
    // Check current theme on mount
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const handleThemeToggle = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSave = () => {
    // Persist dark mode to localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    console.log("Settings saved:", {
      darkMode,
      firstName,
      lastName,
      email,
      phone,
    });
  };

  return (
    <PageLayout title="Settings">
      <div className="max-w-4xl">
        <div className="bg-card rounded-lg p-6 shadow space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Display Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="dark-mode"
                        className="text-base font-medium"
                      >
                        Dark Mode
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark theme
                      </p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={handleThemeToggle}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex gap-2">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFirstName("John");
                    setLastName("Smith");
                    setEmail("john.smith@example.com");
                    setPhone("+91 98765 43210");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
