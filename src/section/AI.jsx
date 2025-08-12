import { useState, useRef, useEffect } from 'react'

function AI() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll ke pesan terbaru
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const sendMessage = async () => {
    const message = inputValue.trim()
    if (!message || isLoading) return

    // Add user message to chat
    const userMessage = { type: 'user', content: message }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      console.log('Sending message:', message) // Debug log
      
      // Test berbagai URL untuk debugging
      let apiUrl = "https://arthurtirta.pythonanywhere.com/get_response";
      
      // Jika pakai proxy di package.json, coba URL relatif
      // apiUrl = "/get_response";
      
      console.log('Trying to fetch from:', apiUrl);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message })
      })

      console.log('Response status:', response.status) // Debug log

      if (!response.ok) {
        const text = await response.text().catch(() => "Unknown error")
        throw new Error(`HTTP ${response.status}: ${text}`)
      }

      const data = await response.json()
      console.log('Response data:', data) // Debug log
      
      // Add assistant response to chat
      const assistantMessage = { 
        type: 'assistant', 
        content: data.response || data.error || 'No response received'
      }
      setMessages(prev => [...prev, assistantMessage])
      
    } catch (error) {
      console.error("Fetch error:", error)
      const errorMessage = { 
        type: 'assistant', 
        content: `Error: ${error.message}. Make sure the Flask server is running on http://localhost:5000`,
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Test connection function dengan berbagai URL
//   const testConnection = async () => {
//     const testUrls = [
//       "http://localhost:5000/test",
//       "http://127.0.0.1:5000/test", 
//       "/test"  // Jika pakai proxy
//     ];

//     for (const url of testUrls) {
//       try {
//         console.log(`Testing: ${url}`);
//         const response = await fetch(url);
//         const data = await response.json();
//         alert(`✅ Success with ${url}: ${data.status}`);
//         return; // Stop jika berhasil
//       } catch (error) {
//         console.log(`❌ Failed with ${url}: ${error.message}`);
//       }
//     }
//     alert("❌ All connection attempts failed");
//   }

  return (
    <div className=" bg-gray-50">
      {/* Main content area */}
      {/* <div className="container mx-auto p-8">
        <h1 className="text-4xl font-light text-center text-gray-800 mb-8">
          Welcome to My Website
        </h1>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            This is a demo website with an AI chatbot. Click the chat button below to start a conversation!
          </p>
          <button 
            onClick={testConnection}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mb-4"
          >
            Test Backend Connection
          </button>
        </div>
      </div> */}

      {/* Chat Toggle Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-black font-light transition-colors z-40 border cursor-pointer"
      >
        💬 {isChatOpen ? 'Close Chat' : 'Chat with Bot'}
      </button>

      {/* Chat Container */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[450px] bg-white border border-gray-300 rounded-lg shadow-2xl flex flex-col z-40">
          {/* Chat Header */}
          <div className="bg-black text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-light ">Arthur Tirtajaya Jehuda</span>
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            </div>
            <button 
              className="hover:bg-blue-600 px-2 py-1 rounded text-lg"
              onClick={toggleChat}
              title="Close chat"
            >
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-gray-500 text-center py-8">
                <div className="text-2xl mb-2">👋</div>
                <div>Hi! I'm Arthur. Feel free to ask about my background, skills, or experience!</div>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-white text-black border rounded-br-sm'
                    : msg.isError
                    ? 'bg-red-100 text-red-800 border border-red-300 rounded-bl-sm'
                    : 'bg-white text-gray-800 shadow-sm border rounded-bl-sm'
                }`}>
                  <div className="text-sm font-normal mb-1">
                    {msg.type === 'user' ? 'You' : 'Arthur'}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-sm border rounded-bl-sm">
                  <div className="text-sm font-medium mb-1">Arthur</div>
                  <div className="flex items-center space-x-1">
                    <span>Typing</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-3 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Lets asking something..."
                disabled={isLoading}
                rows="1"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none disabled:bg-gray-100"
                style={{minHeight: '40px', maxHeight: '100px'}}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-white  hover:text-black border cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AI