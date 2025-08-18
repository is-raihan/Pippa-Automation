# Page snapshot

```yaml
- img "company-logo"
- heading "Sign In" [level=2]
- paragraph: Enter your credential to get started.
- text: Email
- textbox "e.g. olivia@email.com": wrong@email.com
- text: Password
- textbox "Type Password": wrongpassword
- button:
  - img
- button "Sign In"
- link "Forgot Password?":
  - /url: /forgot-password
- separator
- text: or
- separator
- button:
  - img
- text: Don't have an account?
- link "Sign Up":
  - /url: /signup
- status: No user found with this email!
```