'use client'
import {useState, type FormEvent } from 'react';



export default function Form() {
    const [url, setUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [short, setShort] = useState('');

    //onsubmit
    async function onSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const res = await fetch('/api/alias', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({url, alias})
        })
        const data = await res.json();
        if(res.ok)setShort(data.shortUrl);
        else alert(data.msg);
    }


    return (
        <div>
        <form onSubmit={onSubmit}>
        <h1>URL: </h1>
        <input
          required
          placeholder="long url" value={url}
          onChange={e=>setUrl(e.target.value)}/>
        <br></br>
        <h1>https://mp-5-seven-xi.vercel.app/</h1>

        <input
          required
          placeholder="alias"  value={alias}
          onChange={e=>setAlias(e.target.value)}/>
        <button>Submit</button>

      </form>

      {short && (
        <div>
          <input readOnly value={short} />
          <button onClick={
            ()=>navigator.clipboard.writeText(short)}>
                copy
                </button>
        </div>
      )}
      </div>
  )}
  