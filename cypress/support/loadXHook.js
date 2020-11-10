export default function(handleStubbedRoute) {
    Cypress.once('window:before:load', window => {
        const script = window.document.createElement('script')
        script.onload = function() {
            window.xhook.before((request, callback) => {
                try {
                    const fixture =
                        'xhr' in request
                            ? handleStubbedRoute({
                                  url: request.url.url,
                                  method: request.method.toUpperCase(),
                                  requestBody: request.body || null,
                              })
                            : handleStubbedRoute(request)

                    console.log(fixture)
                    callback({
                        status: fixture.status,
                        text: fixture.responseBody,
                        data: fixture.responseBody,
                        headers: fixture.responseHeaders,
                    })
                } catch (error) {
                    console.error('xHook catch', error)
                }
            })
        }
        script.src = '//unpkg.com/xhook@latest/dist/xhook.min.js'
        script.id = 'xhook'
        window.document.head.appendChild(script)
    })
}
