import SwiftUI
import WebKit

// A minimal native iPhone wrapper for Casebook. It loads the bundled, fully
// offline casebook.html (and its icons) from the app bundle in a WKWebView.

struct WebView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.isOpaque = true
        if let url = Bundle.main.url(forResource: "casebook", withExtension: "html") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
        return webView
    }
    func updateUIView(_ uiView: WKWebView, context: Context) {}
}

struct ContentView: View {
    var body: some View {
        WebView().ignoresSafeArea()
    }
}

@main
struct CasebookApp: App {
    var body: some Scene {
        WindowGroup { ContentView() }
    }
}
