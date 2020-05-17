export interface ToDo {
  _id: {
    $oid: string
  };
  title: string;
  content: string;
  timestamp: Date;
}