import re

with open('frontend/src/pages/PreviewPage.tsx', 'r') as f:
    content = f.read()

new_error_handler = """
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        const errMsg = data.error || 'Unknown error';
        if (errMsg.includes('not configured yet') || errMsg.includes('pdt_dummy')) {
           alert('Payment is not configured correctly on this website. The owner needs to add a valid DODO_PRODUCT_ID in Vercel to accept payments.');
        } else {
           alert('Failed to initiate checkout: ' + errMsg);
        }
      }
"""

content = re.sub(
    r"if \(data\.checkout_url\) \{.*?\} else \{.*?\alert\('Failed to initiate checkout: ' \+ \(data\.error \|\| 'Unknown error'\)\).*?\}",
    new_error_handler,
    content,
    flags=re.DOTALL
)

with open('frontend/src/pages/PreviewPage.tsx', 'w') as f:
    f.write(content)
