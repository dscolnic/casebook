module.exports = { PACK: {
  "id": "payment",
  "icon": "$",
  "discipline": "Finance & payment systems",
  "title": "What Happens After You Tap",
  "headline": "Trace a card purchase from authorization to merchant payment.",
  "kicker": "Coffee shop checkout · A customer taps a card",
  "story": [
    "The terminal displays Approved almost immediately, but the merchant has not yet received final funds.",
    "Arrange the simplified four-party pathway from the tap to clearing and settlement."
  ],
  "overview": "A card payment is both a communications problem and an accounting problem. The terminal, merchant processor, card network, issuing bank, acquiring bank, and merchant account hold different information and authority. A message saying “approved” is not the same thing as a reconciled obligation or transferred money.",
  "terms": [
    [
      "Merchant",
      "The business accepting the card payment."
    ],
    [
      "Acquirer",
      "The bank or processor serving the merchant side of the transaction."
    ],
    [
      "Issuer",
      "The bank that issued the customer’s card and maintains the account."
    ],
    [
      "Card network",
      "The system routing messages between the acquiring and issuing sides."
    ],
    [
      "Authorization",
      "The issuer’s rapid approval or decline decision."
    ],
    [
      "Capture",
      "The merchant’s submission of an approved sale for financial processing."
    ],
    [
      "Clearing",
      "The reconciliation and calculation of what participants owe."
    ],
    [
      "Settlement",
      "The actual transfer of funds between institutions."
    ]
  ],
  "note": "Messaging, timing, fees, and posting vary by network and country. This game distinguishes rapid authorization from clearing, settlement, and merchant funding.",
  "sources": "Fact-checked against Federal Reserve descriptions of authorization, clearing, and settlement.",
  "chapters": [
    {
      "id": "authorize",
      "cards": [
        [
          "read",
          "The terminal reads the card credential and purchase amount"
        ],
        [
          "package",
          "The acquirer packages an authorization request"
        ],
        [
          "route",
          "The card network routes the request to the issuer"
        ],
        [
          "check",
          "The issuer checks the account and fraud signals"
        ]
      ]
    },
    {
      "id": "capture",
      "cards": [
        [
          "decision",
          "The issuer creates an approval or decline code"
        ],
        [
          "return",
          "The network returns the decision to the terminal"
        ],
        [
          "complete",
          "The merchant completes the approved sale"
        ],
        [
          "batch",
          "The processor captures the sale in a batch"
        ]
      ]
    },
    {
      "id": "fund",
      "cards": [
        [
          "records",
          "The institutions exchange detailed transaction records"
        ],
        [
          "clear",
          "Clearing calculates the net obligations"
        ],
        [
          "settle",
          "Settlement transfers funds between banks"
        ],
        [
          "credit",
          "The acquirer credits the merchant account"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "authorize",
    "capture",
    "fund"
  ],
  "segues": [
    "The institution responsible for the customer’s card now has the information needed to make a permission decision. That decision must travel back to the merchant so checkout can be completed.",
    "The purchase now has both permission and a completed sale record, but no final merchant funding. The participating institutions must reconcile the records, calculate obligations, and move money."
  ],
  "principles": [
    [
      "Permission is not payment",
      "An authorization message can approve a purchase even though money has not yet reached the merchant."
    ],
    [
      "Different institutions hold different information",
      "The issuer knows the cardholder account, while the acquiring side serves the merchant."
    ],
    [
      "A completed sale must enter financial processing",
      "The system needs a final record of what the merchant intends to collect."
    ],
    [
      "Accounting precedes movement of funds",
      "Participants calculate obligations before banks transfer money and credit the merchant."
    ]
  ],
  "hints": [
    "The card network routes the request to the issuer before the issuer checks the account and fraud signals.",
    "Clearing calculates the net obligations before settlement transfers funds between banks."
  ],
  "intro": "A customer presents a card at the terminal, but the merchant has neither permission to complete the sale nor any transferred funds. Sequence A must carry the purchase information to the institution able to make the authorization decision.",
  "collection": "Core collection"
} };
