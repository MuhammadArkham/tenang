$xml = [xml](Get-Content 'c:\Project saya\Tenang_Developer_Docs\extracted\word\document.xml' -Raw)
$nsm = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$nsm.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
$xml.SelectNodes('//w:p', $nsm) | ForEach-Object { $_.InnerText } | Out-File 'c:\Project saya\Tenang_Developer_Docs\full_text.txt' -Encoding UTF8
