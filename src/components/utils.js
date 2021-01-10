export const fetchData = (url, method, JWT, id = '', body = undefined) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': "Bearer " + JWT
  }

  const fullUrl = url[url.length - 1] === '/' ? url + id : url + '/' + id

  return fetch(fullUrl, {
    method: method,
    body: JSON.stringify(body),
    headers: headers,
  }).then(resp => {
    if(resp.ok){
      return resp.json()
    }
    return resp.json()
      .then(error => {
        alert(new Error(error))
      })
  })
}