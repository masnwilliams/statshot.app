import { auth, firestore, googleAuthProvider } from '@lib/firebase';
import { UserContext } from '@lib/context';
import Metatags from '@components/Metatags';

import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';

export default function Login(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      <Metatags title="Login" description="Sign in to this amazing app!" />
      {
      user ? 
      !username ? 
      <UsernameForm /> : 
      <SignOutButton />
      : <SignInButtons />
      }
    </main>
  );
}

// Sign in with Google button
function SignInButtons() {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src={'/google.png'} width="30px" /> Sign in with Google
      </button>
      {/* <button className="btn-google" onClick={signInWithMicrosoft}>
        <img src={'/microsoft.png'} width="30px" /> Sign in with Microsoft
      </button> */}
      <button onClick={() => auth.signInAnonymously()}>
        Sign in Anonymously
      </button>
    </>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

// Username form
function UsernameForm() {
  const [formValuePlatform, setFormValuePlatform] = useState('xbl');
  const [formValueUsername, setFormValueUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username, platform } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`halo-infinite/${formValuePlatform}/users/${user.uid}`);
    const usernameDoc = firestore.doc(`halo-infinite/${formValuePlatform}/usernames/${formValueUsername}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValueUsername,
      platform: formValuePlatform,
      photoURL: user.photoURL, 
      displayName: user.displayName
     });
    batch.set(usernameDoc, { 
      uid: user.uid
     });

    await batch.commit();
  };

  const onChange = (e) => {

    if (e.target.name == 'platforms') {

      const val = e.target.value.toLowerCase();

      if (val.length > 0 && val != 'select-platform') {
        setFormValuePlatform(val);
        setLoading(false);
      }

    } else if (e.target.name == 'username') {
      // Force form value typed in form to match correct format
      const val = e.target.value.toLowerCase();
      const re = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

      // Only set form value if length is < 3 OR it passes regex
      if (val.length < 3) {
        setFormValueUsername(val);
        setLoading(false);
        setIsValidUsername(false);
      }

      if (re.test(val)) {
        setFormValueUsername(val);
        setLoading(true);
        setIsValidUsername(false);
      }
    }
  };

  //

  useEffect(() => {
    checkFormValues(formValueUsername);
  }, [formValueUsername]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkFormValues = useCallback(
    debounce(async (username) => {

      if (platform && platform != "select-platform") {
        setLoading(false);
      }

      if (username.length >= 3) {
        const ref = firestore.doc(`halo-infinite/${formValuePlatform}/usernames/${username}`);
        const { exists } = await ref.get();
        // console.log('Firestore read executed!');
        setIsValidUsername(!exists);
        setLoading(false);
      }

    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Platform and Username</h3>
        <form onSubmit={onSubmit}>
          <select name="platforms" id="platforms" onChange={onChange}>
            <option value="xbl">Xbox Live</option>
            <option value="steam">Steam</option>
          </select>
          <br />
          <br />
          <input name="username" placeholder="username" value={formValueUsername} onChange={onChange} />
          <UsernameMessage username={formValueUsername} isValid={isValidUsername} loading={loading} />
          <button type="submit" className="btn-green" disabled={!isValidUsername}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Platform: {formValuePlatform}
            <br />
            Username: {formValueUsername}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValidUsername.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username.length > 0 && username.length < 3) {
    return <p className="text-danger">That username is not at least 3 characters!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
