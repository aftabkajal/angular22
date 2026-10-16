
export interface IEnquiry {
  enquiryId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  categoryId: number;
  categoryName: string;
  statusId: number;
  statusName: string;
  enquiryType: string;
  isConverted: boolean;
  enquiryDate: string;
  followUpDate: string;
  feedback: string;
}
