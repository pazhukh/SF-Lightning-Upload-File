public class UploadFileAsContentDocumentController {
	
    @AuraEnabled
    public static void uploadImage(String doc, String fileName, Id recordId) {
        String myFile = EncodingUtil.urlDecode(doc, 'UTF-8');
        Blob b = EncodingUtil.base64Decode(myFile.substringAfter(','));

        ContentVersion contentVersion = new ContentVersion(
                Title = fileName,
                PathOnClient = fileName,
                VersionData = b,
                IsMajorVersion = true
        );
        insert contentVersion;

        ContentVersion cv = [
                SELECT
                    ContentDocumentId
                FROM
                    ContentVersion
                WHERE
                    Id = :contentVersion.Id
        ];

        ContentDocumentLink cdl = new ContentDocumentLink(
                LinkedEntityId = recordId,
                ContentDocumentId = cv.ContentDocumentId,
                Visibility = 'AllUsers',
                ShareType = 'V'
        );
        insert cdl;
    }
}