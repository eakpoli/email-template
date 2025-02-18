export const getDocumentTypeLabel = (data: any) => {
  switch (data.documentType) {
    case 'IDENTITY':
      return "Pièce d'identité";
    case 'RESIDENCE':
      return 'Justificatif de domicile';
    case 'RIB':
      return 'RIB';
    case 'UBO':
      return 'Document UBO';
    case 'OTHER':
      return 'Autre document';
    case 'INVOICE':
      return 'Facture';
  }
};
