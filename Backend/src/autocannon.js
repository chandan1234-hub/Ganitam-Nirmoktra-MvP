import autocannon from 'autocannon'


async function runLoadTest() {
  const result = await autocannon({
    url: 'http://localhost:8000',
    connections: 10, // default
    pipelining: 10, // default
    duration: 10 // default in seconds
  })

  console.log('Test completed successfully!')
  console.log(`Max latency: ${result.latency.max} ms`)
  console.log(`Average Requests/Sec: ${result.requests.average}`)
}

runLoadTest().catch(console.error)