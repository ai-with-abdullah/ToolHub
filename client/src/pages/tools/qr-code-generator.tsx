import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrType, setQrType] = useState("text");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [size, setSize] = useState("200");

  useEffect(() => {
    // Scroll to top when component mounts - use multiple methods to ensure it works
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    document.title = "QR Code Generator - ToolHub | Free Online QR Code Generator";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate QR codes for text, URLs, contact info, WiFi credentials, and more with download options. Free QR code generator.');
    }
  }, []);

  const generateQRCode = () => {
    if (!text.trim()) {
      setQrCodeUrl("");
      return;
    }

    let qrText = text;
    
    // Format based on QR type
    switch(qrType) {
      case 'url':
        if (!text.startsWith('http://') && !text.startsWith('https://')) {
          qrText = 'https://' + text;
        }
        break;
      case 'email':
        qrText = `mailto:${text}`;
        break;
      case 'phone':
        qrText = `tel:${text}`;
        break;
      case 'sms':
        qrText = `sms:${text}`;
        break;
    }

    // Use QR Server API for generating QR codes
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrText)}`;
    setQrCodeUrl(qrApiUrl);
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearForm = () => {
    setText("");
    setQrCodeUrl("");
  };

  useEffect(() => {
    if (text) {
      generateQRCode();
    } else {
      setQrCodeUrl("");
    }
  }, [text, qrType, size]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              <i className="fas fa-qrcode text-primary mr-2"></i>
              QR Code Generator
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Generate QR codes for text, URLs, contact info, WiFi credentials, and more with download options.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="qr-type">QR Code Type</Label>
                    <Select value={qrType} onValueChange={setQrType}>
                      <SelectTrigger data-testid="select-qr-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Plain Text</SelectItem>
                        <SelectItem value="url">Website URL</SelectItem>
                        <SelectItem value="email">Email Address</SelectItem>
                        <SelectItem value="phone">Phone Number</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="qr-size">QR Code Size</Label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger data-testid="select-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="150">150x150</SelectItem>
                        <SelectItem value="200">200x200</SelectItem>
                        <SelectItem value="300">300x300</SelectItem>
                        <SelectItem value="400">400x400</SelectItem>
                        <SelectItem value="500">500x500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="qr-content">Content</Label>
                    {qrType === 'text' ? (
                      <Textarea
                        id="qr-content"
                        placeholder="Enter your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="mt-2"
                        data-testid="textarea-content"
                      />
                    ) : (
                      <Input
                        id="qr-content"
                        type="text"
                        placeholder={
                          qrType === 'url' ? 'https://example.com' :
                          qrType === 'email' ? 'user@example.com' :
                          qrType === 'phone' ? '+1234567890' :
                          'Message text'
                        }
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="mt-2"
                        data-testid="input-content"
                      />
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={generateQRCode} disabled={!text} data-testid="button-generate">
                      <i className="fas fa-qrcode mr-2"></i>Generate QR Code
                    </Button>
                    <Button onClick={clearForm} variant="secondary" data-testid="button-clear">
                      <i className="fas fa-trash mr-2"></i>Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  {qrCodeUrl ? (
                    <>
                      <div className="flex justify-center">
                        <img 
                          src={qrCodeUrl} 
                          alt="Generated QR Code"
                          className="border border-slate-200 rounded-lg shadow-sm"
                          data-testid="qr-code-image"
                        />
                      </div>
                      <div className="space-y-3">
                        <Button onClick={downloadQRCode} className="w-full" data-testid="button-download">
                          <i className="fas fa-download mr-2"></i>Download QR Code
                        </Button>
                        <p className="text-sm text-slate-600">
                          Right-click and "Save image as..." to save the QR code
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-64 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300">
                      <div className="text-center">
                        <i className="fas fa-qrcode text-4xl text-slate-400 mb-4"></i>
                        <p className="text-slate-500">Enter content to generate QR code</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}