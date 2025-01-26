import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface Alert {
  id: number;
  subject: string;
  date: string;
  cost: number;
  interaction: {
    rate: number;
    period: string;
  };
  usage: {
    current: number;
    expected: number;
    unit: string;
  };
  message: string;
  recipient: string;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    subject: "OpsWatch Alert: Cloud Server Utilization resulting in overhead waste of $37,569.89",
    date: "2024-03-15",
    cost: 37569.89,
    interaction: {
      rate: 15,
      period: "last day"
    },
    usage: {
      current: 23,
      expected: 85,
      unit: "percent"
    },
    message: "Critical alert: Significant cost inefficiency detected in cloud server infrastructure. Current utilization rates are substantially below expected thresholds, resulting in unnecessary expenditure. \nPlease get in contact with DevOps and CloudOps teams to reduce further nonessential expenses.",
    recipient: "Director of Operations"
  },
  // Add more mock alerts here...
];

const AlertsPage: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cost Alerts
      </Typography>
      
      <List>
        {mockAlerts.map((alert) => (
          <Paper
            key={alert.id}
            sx={{ mb: 2, cursor: 'pointer' }}
            elevation={2}
          >
            <ListItem onClick={() => handleAlertClick(alert)}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <WarningIcon color="warning" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" component="div">
                    {alert.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {alert.date}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          </Paper>
        ))}
      </List>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedAlert && (
          <>
            <DialogTitle>
              <Typography variant="h6" component="div">
                Cost Alert Details
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {selectedAlert.subject}
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" gutterBottom>
                  Interaction Rate
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedAlert.interaction.rate}% over {selectedAlert.interaction.period}
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  Resource Usage
                </Typography>
                <Typography variant="body1" paragraph>
                  Current: {selectedAlert.usage.current}% | Expected: {selectedAlert.usage.expected}%
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  Notification
                </Typography>
                <Typography variant="body1" paragraph>
                  To: {selectedAlert.recipient}
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedAlert.message}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" color="primary">
                Mark as Resolved
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AlertsPage; 