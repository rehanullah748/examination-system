import Image from 'next/image'

export default function Home() {
  return (
    
   
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
     
      <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
        <div className="lg:col-span-7">
          
          <div className="grid grid-cols-12 gap-2 sm:gap-6 items-center lg:-translate-x-10">
            <div className="col-span-4">
              <img className="rounded-xl" src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image Description"/>
            </div>
            
    
            <div className="col-span-3">
              <img className="rounded-xl" src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image Description"/>
            </div>
            
    
            <div className="col-span-5">
              <img className="rounded-xl" src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image Description"/>
            </div>
          
          </div>
         
        </div>
        
    
        <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
          <div className="space-y-6 sm:space-y-8">
          
            <div className="space-y-2 md:space-y-4">
              <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200">
                Collaborative tools to access exaimination
              </h2>
              <p className="text-gray-500">
                This tool can minimize your efforts and time
              </p>
            </div>
         
            <ul role="list" className="space-y-2 sm:space-y-4">
              <li className="flex space-x-3">
            
                <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                  <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
               
    
                <span className="text-sm sm:text-base text-gray-500">
                  <span className="font-bold">Less routine</span> – more creativity
                </span>
              </li>
    
              <li className="flex space-x-3">
               
                <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                  <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
               
    
                <span className="text-sm sm:text-base text-gray-500">
                  Hundreds of thousands saved
                </span>
              </li>
    
              <li className="flex space-x-3">
               
                <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                  <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
               
    
                <span className="text-sm sm:text-base text-gray-500">
                  Scale budgets <span className="font-bold">efficiently</span>
                </span>
              </li>
            </ul>
          
          </div>
        </div>
      
      </div>
    
    </div>
    
  )
}
