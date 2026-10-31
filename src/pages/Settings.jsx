
import { useEffect, useState } from "react";
import {
  UserRound,
  Bell,
  ListChecks,
  Palette,
  Database,
  Save,
} from "lucide-react";

const defaultSettings = {
  adminName: "Admin",
  email: "admin@example.com",
  taskUpdates: true,
  overdueReminders: true,
  defaultPriority: "Medium",
  compactView: false,
  appearance: "beige",
};

export default function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem("trackerSettings");

      return stored
        ? { ...defaultSettings, ...JSON.parse(stored) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [saved, setSaved] = useState(false);

  // Apply selected theme immediately
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      settings.appearance
    );
  }, [settings.appearance]);

  // Update settings
  const handleChange = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  };

  // Save settings
  const handleSave = () => {
    localStorage.setItem(
      "trackerSettings",
      JSON.stringify(settings)
    );

    setSaved(true);
  };

  // Reset settings
  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("trackerSettings");
    setSaved(false);
  };

  return (
    <div className={`settings-page ${settings.compactView ? "compact-view" : ""}`}>

      <div className="settings-intro">
        <h2>Application Settings</h2>
        <p>Manage your profile and application preferences.</p>
      </div>

      {/* Profile Settings */}
      <section className="settings-card">
        <div className="settings-card-heading">
          <UserRound size={21} />
          <div>
            <h3>Profile Information</h3>
            <p>Manage your administrator details.</p>
          </div>
        </div>

        <div className="settings-fields">
          <label>
            Full Name
            <input
              type="text"
              value={settings.adminName}
              onChange={(e) =>
                handleChange("adminName", e.target.value)
              }
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
            />
          </label>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="settings-card">
        <div className="settings-card-heading">
          <Bell size={21} />
          <div>
            <h3>Notifications</h3>
            <p>Choose which reminders you want to enable.</p>
          </div>
        </div>

        <label className="settings-toggle">
          <span>
            <strong>Task Updates</strong>
            <small>Enable task update preferences.</small>
          </span>

          <input
            type="checkbox"
            checked={settings.taskUpdates}
            onChange={(e) =>
              handleChange("taskUpdates", e.target.checked)
            }
          />
        </label>

        <label className="settings-toggle">
          <span>
            <strong>Overdue Reminders</strong>
            <small>Enable overdue task reminders.</small>
          </span>

          <input
            type="checkbox"
            checked={settings.overdueReminders}
            onChange={(e) =>
              handleChange("overdueReminders", e.target.checked)
            }
          />
        </label>
      </section>

      {/* Task Preferences */}
      <section className="settings-card">
        <div className="settings-card-heading">
          <ListChecks size={21} />
          <div>
            <h3>Task Preferences</h3>
            <p>Set your default task preferences.</p>
          </div>
        </div>

        <label className="settings-field">
          Default Task Priority

          <select
            value={settings.defaultPriority}
            onChange={(e) =>
              handleChange("defaultPriority", e.target.value)
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
      </section>

      {/* Appearance Settings */}
      <section className="settings-card">
        <div className="settings-card-heading">
          <Palette size={21} />
          <div>
            <h3>Appearance</h3>
            <p>Choose your preferred application theme.</p>
          </div>
        </div>

        <label className="settings-field">
          Select Theme

          <select
            value={settings.appearance}
            onChange={(e) =>
              handleChange("appearance", e.target.value)
            }
          >
            <option value="beige">Beige & Terracotta</option>
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </select>
        </label>

        <div className="theme-preview">
          <span style={{ background: "#F7F3EE" }} />
          <span style={{ background: "#302720" }} />
          <span style={{ background: "#C46A45" }} />

          <strong>
            {settings.appearance === "beige"
              ? "Beige & Terracotta"
              : settings.appearance === "light"
              ? "Light Theme"
              : "Dark Theme"}
          </strong>
        </div>

        <label className="settings-toggle">
          <span>
            <strong>Compact View</strong>
            <small>Reduce spacing inside the settings page.</small>
          </span>

          <input
            type="checkbox"
            checked={settings.compactView}
            onChange={(e) =>
              handleChange("compactView", e.target.checked)
            }
          />
        </label>
      </section>

      {/* Application Information */}
      <section className="settings-card">
        <div className="settings-card-heading">
          <Database size={21} />
          <div>
            <h3>Application Information</h3>
            <p>Project technology details.</p>
          </div>
        </div>

        <div className="app-info">
          <p><strong>Application:</strong> Employee Task Tracker</p>
          <p><strong>Frontend:</strong> React + Vite</p>
          <p><strong>Backend:</strong> Python + FastAPI</p>
          <p><strong>Database:</strong> PostgreSQL</p>
          <p><strong>Version:</strong> 1.0.0</p>
        </div>
      </section>

      {/* Actions */}
      <div className="settings-actions">
        <button
          className="reset-button"
          onClick={handleReset}
        >
          Reset
        </button>

        <button
          className="save-button"
          onClick={handleSave}
        >
          <Save size={17} />
          Save Changes
        </button>
      </div>

      {saved && (
        <p className="settings-success">
          Settings saved successfully!
        </p>
      )}
    </div>
  );
}
