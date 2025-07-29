import { RECEIVER_SECTION_CONSTANTS } from "../../../constants/receiverSection";
import { NoReceiversContent } from "./NoReceiver.styles.tsx";
import { Typography } from "@/components/Typography/Typography";

function NoReceiver() {
  return (
    <NoReceiversContent>
      <Typography variant="label1Regular" as="p" color="sub">
        {RECEIVER_SECTION_CONSTANTS.NO_RECEIVERS_MESSAGE}
      </Typography>
      <Typography variant="label1Regular" as="p" color="sub">
        {RECEIVER_SECTION_CONSTANTS.ADD_RECEIVER_GUIDE}
      </Typography>
    </NoReceiversContent>
  );
}

export default NoReceiver;
