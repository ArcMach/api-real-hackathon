const { PDFParse } = require("pdf-parse");

async function main() {
    const parser = new PDFParse({
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    });

    try {
        const result = await parser.getText();
        console.log("Extracted text:");
        console.log(result.text.slice(0, 500));
    } finally {
        await parser.destroy();
    }
}

main().catch(console.error);
