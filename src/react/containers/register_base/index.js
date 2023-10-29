import React, { useState } from 'react';

export const MPosRegister = () =>{

    const [code, setCode] = useState('');

    return (
        <div>
            <input type='text' maxLength={5} value={code} onChange={e=>{
                const res = e.target.value.toUpperCase();
                setCode(res);
            }} />
            <button>Registrar</button>
        </div>
    );
}
