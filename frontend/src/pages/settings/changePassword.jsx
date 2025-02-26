import strings from "@/constants/ui/strings";
import { useState } from "react";
import Input from "@/components/Form/Input";
import PasswordLabel from "@/components/Form/PasswordLabel";
import { BASE_URL } from "@/constants/routes";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const uiText = strings.EN.SETTINGS;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitChangePassword = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/user/change-password`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        confirmPassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect the user to their profile page
          response.json().then((body) => {
            toast.success("Password changed successfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          });
        } else {
          // Login failed
          response.json().then((body) => {
            toast.error(
              "There was an error changing your password. Check if your data is correct"
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error logging in", error);
      });
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">{uiText.changePassword}</h2>
      <form onSubmit={onSubmitChangePassword}>
        <div>
          <label htmlFor="oldPassword">{uiText.currentPassword}</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="newPassword">{uiText.newPassword}</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">{uiText.newPasswordAgain}</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={!oldPassword || !newPassword || !confirmPassword}
            className="px-4 w-full border rounded-full py-2 bg-blue-600 text-white mt-4 disabled:opacity-60"
          >
            {uiText.changePassword}
          </button>
        </div>
      </form>
    </div>
  );
}
