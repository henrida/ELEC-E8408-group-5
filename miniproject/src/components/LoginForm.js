import React, { useState } from "react";

function LoginForm({Login, error}) {
  const [id, setId] = useState("");

  function validateForm() {
    var code, i, len;

    for (i = 0, len = id.length; i < len; i++) {
        code = id.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
    }
    return true;
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