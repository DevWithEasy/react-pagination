const fetchData =async(data,setData,) => {
    try{
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json()
      setData(data)
    }catch(e){
      console.log(e)
    }
}
export default fetchData;