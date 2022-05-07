// Utility functions

// Paths for routing and requests
export const path = {
    admin:'/admin/',
    comp:'/competition/',
    reg:'/register/',
    user:'/user/',
};

// Backend request wrapper
export const request = async (resource, method = 'GET', data = null) => {
    try {
        let resp = await fetch('/backend' + resource, {
            method: method,
            headers: { 'Content-type': 'application/json' },
            body: data && JSON.stringify(data)
        });
        // Parse as json if expected, else return bool
        if (resp.ok && resp.status != 204 &&
            (method === 'GET' || method === 'POST')) return await resp.json();
        return resp.ok;
    } catch(e) {
        console.log(method + ' request failed');
    }
};

// Handle ui focus change
// Stupid trick: setUi is called as second arg to make mode-setting simple,
// but that arg is not used here
export const focus = (ev) => {
    // Remove .sel from previous focus and add it to clicked one
    ev.target.parentNode.querySelector('.sel')?.classList.remove('sel');
    ev.target.classList.add('sel');
};

// Check that field isn't empty
export const check = (field) => {
    field.current.classList.remove('error');
    if (!field.current.value) {
        field.current.classList.add('error');
        return false;
    }
    return true;
};

// Check that fields match and aren't empty
export const compare = (f1, f2) => {
    f1.current.classList.remove('error');
    f2.current.classList.remove('error');

    if (f1.current.value === '' ||
        f1.current.value !== f2.current.value) {
        f1.current.classList.add('error');
        f2.current.classList.add('error');
        return false;
    }
    return true;
};
