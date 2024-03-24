"use client"

import Header from "./components/Header"
import MainContainer from "./components/MainContainer"
import DownloadLicense from "./parts/DownloadLicense"
import PushLicense from "./parts/PushLicense"

export default function Home() {
  return (
    <>
    <Header/>
      <MainContainer>
        <DownloadLicense/>
          <hr />   
        <PushLicense/>
      </MainContainer>

    </>
  )
  }
 
// export default function Home() {

//   async function onSubmit(event: any) {
//     event.preventDefault()

//     try {
//       const response = await fetch('/api/pod', {
//         method: 'GET',
//       })
 
//       if (!response.ok) {
//         throw new Error('Failed to submit the data. Please try again.')
//       }
//       // Handle response if necessary
//       const data = await response.json()
//       console.log(data)
//     } catch (error) {
//       // Capture the error message to display to the user
//       console.error(error)
//     } finally {
//       console.log("done")
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input type="text" name="name" />
//         <button type="submit">

//         </button>
//       </form>
//     </div>
//   )
// }