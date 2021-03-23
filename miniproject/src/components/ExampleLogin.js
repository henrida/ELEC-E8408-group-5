import React, { useState } from "react";

function LoginForm({Login, error}) {
  //const [name, setName] = useState("");
  const [id, setId] = useState("");

  function validateForm() {
    //return name.length > 0 && id.length > 0;
    return id.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    //Login({name, id})
    Login({id})
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        {/* <div>
            <label>
                Name: 
                <input 
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
        </div> */}
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