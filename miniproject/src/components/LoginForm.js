import React, { useState } from "react";

function LoginForm({Login, error}) {
  const [id, setId] = useState("");

  function validateForm() {
    return id.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    Login({id})
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div>
            <label>
                Guide ID:
                <input 
                    type="password"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
            </label>
        </div>
        <div>
            <button block size="lg" type="submit" disabled={!validateForm()}>
            Login
            </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;