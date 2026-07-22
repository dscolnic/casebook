module.exports = { PACK: {
  "id": "web",
  "icon": "⌁",
  "discipline": "Computing",
  "title": "The First Visit to a Secure Website",
  "headline": "Put the hidden network and browser operations behind one click into order.",
  "kicker": "Browser laboratory · Assume an uncached first visit over HTTPS",
  "story": [
    "A user enters a web address and presses Return. The browser must coordinate networking, security, document processing, and graphics to produce an interactive page.",
    "Reconstruct the dependency chain from the information in the typed address to the final pixels on the screen."
  ],
  "overview": "A secure webpage depends on several specialized systems. Human-readable addresses, numerical routing, reliable transport, encryption, application messages, document structure, supporting files, and visual rendering are different layers. The puzzle depends on recognizing how the output of one layer becomes the input used by a different layer.",
  "terms": [
    [
      "URL",
      "The full web address, including the protocol, hostname, and path."
    ],
    [
      "DNS",
      "The system that converts a hostname such as example.com into an IP address."
    ],
    [
      "IP address",
      "A numerical network destination used to route packets."
    ],
    [
      "TCP",
      "A transport protocol that provides ordered, reliable delivery."
    ],
    [
      "TLS",
      "The protocol that authenticates the server and encrypts HTTPS traffic."
    ],
    [
      "HTML",
      "The main markup language describing the structure of a web page."
    ],
    [
      "Render",
      "To calculate the page’s appearance and draw it on the screen."
    ]
  ],
  "note": "Browsers perform some work in parallel and may reuse cached information. This game presents the dependency order for a fresh secure connection.",
  "sources": "Fact-checked against MDN documentation on DNS, TCP, TLS, HTTP, parsing, layout, and painting.",
  "chapters": [
    {
      "id": "connect",
      "cards": [
        [
          "parse",
          "The browser separates the typed web address into parts"
        ],
        [
          "dns",
          "DNS matches the website name to an IP address"
        ],
        [
          "tcp",
          "The browser and server establish a reliable connection"
        ],
        [
          "tls",
          "TLS verifies the server and creates encryption"
        ]
      ]
    },
    {
      "id": "exchange",
      "cards": [
        [
          "request",
          "The browser sends an HTTP request for the page"
        ],
        [
          "receive",
          "The server application receives the request"
        ],
        [
          "build",
          "The server builds an HTTP response"
        ],
        [
          "html",
          "The main HTML document reaches the browser"
        ]
      ]
    },
    {
      "id": "render",
      "cards": [
        [
          "parsehtml",
          "The browser turns HTML into a document structure"
        ],
        [
          "assets",
          "The browser loads styles, scripts, images, and fonts"
        ],
        [
          "layout",
          "The browser calculates sizes, positions, and visual layers"
        ],
        [
          "paint",
          "The browser paints pixels and activates interactive scripts"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "connect",
    "exchange",
    "render"
  ],
  "segues": [
    "The browser now has a private, reliable channel to the correct server. That channel can carry a request naming the particular page the user wants.",
    "The browser now possesses the page’s main structural instructions. Those instructions identify supporting files and provide the information needed to calculate and draw the page."
  ],
  "principles": [
    [
      "Each layer solves a different problem",
      "Names, routing, reliable delivery, encryption, application messages, and visual rendering are not interchangeable."
    ],
    [
      "Outputs become inputs",
      "The result produced by one system is often exactly what the next system needs."
    ],
    [
      "Security needs a communication path",
      "The browser cannot negotiate an encrypted session with a server until it can reach that server reliably."
    ],
    [
      "A document is not yet a visible page",
      "The browser still needs supporting files, layout calculations, and drawing operations."
    ]
  ],
  "hints": [
    "DNS supplies the IP address before the browser and server establish their reliable connection.",
    "The server builds an HTTP response before the main HTML document can reach the browser."
  ],
  "intro": "The user has entered a secure web address, but the browser has no ready connection and has not yet obtained the requested page. Sequence A must establish a trustworthy communication path to the correct destination.",
  "collection": "Core collection"
} };
