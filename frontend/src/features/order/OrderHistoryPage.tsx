import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axiosInstance";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

type Order = {
  orderId: number;
  status: number;
  totalPrice: number;
  orderDate: string;
  destinationName: string;
  destinationAddress: string;
  paymentMethod: number;
};

type Color = "info" | "warning" | "success" | "default";

const getStatusLabel = (status: number) => {
  switch (status) {
    case 0:
      return { label: "注文受付", color: "info" };
    case 1:
      return { label: "発送準備中", color: "warning" };
    case 2:
      return { label: "発送済み", color: "success" };
    default:
      return { label: "不明", color: "default" };
  }
};

const getPaymentMethodLabel = (method: number) => {
  switch (method) {
    case 0:
      return "クレジットカード";
    case 1:
      return "代金引換";
    default:
      return "不明";
  }
};

export function OrderHistoryPage() {
  //   const [orders, setOrders] = useState<Order[]>([]);

  //   useEffect(() => {
  //     const fetchOrders = async () => {
  //       try {
  //         const response = await axiosInstance.get("/orders");
  //         setOrders(response.data);
  //       } catch (error) {
  //         console.error("注文履歴の取得に失敗しました", error);
  //       }
  //     };
  //     fetchOrders();
  //   }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" component="h1" className="mb-6 font-bold">
        注文履歴
      </Typography>

      {orders.length === 0 ? (
        <Typography className="text-center text-gray-600 mt-8">
          注文履歴がありません
        </Typography>
      ) : (
        <TableContainer component={Paper} className="shadow-lg">
          <Table>
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableCell>注文番号</TableCell>
                <TableCell>注文日</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>お届け先</TableCell>
                <TableCell>支払方法</TableCell>
                <TableCell align="right">合計金額</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => {
                const status = getStatusLabel(order.status);
                return (
                  <TableRow key={order.orderId} className="hover:bg-gray-50">
                    <TableCell>{`#${order.orderId}`}</TableCell>

                    <TableCell>
                      {format(
                        new Date(order.orderDate),
                        "yyyy年MM月dd日 HH:mm",
                        {
                          locale: ja,
                        },
                      )}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={status.label}
                        color={status.color as Color}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">
                        <div>{`${order.destinationName} 様`}</div>

                        <div className="text-gray-500">
                          {order.destinationAddress}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {getPaymentMethodLabel(order.paymentMethod)}
                    </TableCell>

                    <TableCell align="right">
                      {`¥${order.totalPrice.toLocaleString()}`}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
