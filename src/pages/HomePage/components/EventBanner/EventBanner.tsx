import { BannerCard, EventBannerSection } from "./EventBanner.styles";
import { EVENT_BANNER_LABELS } from "./constants/labels";
import { Typography } from "@/components/Typography/Typography";

function EventBanner() {
  return (
    <EventBannerSection>
      <BannerCard>
        <Typography variant="label2Regular" as="p" color="sub">
          {EVENT_BANNER_LABELS.SUB_TITLE}
        </Typography>
        <Typography variant="label1Bold" as="p">
          {EVENT_BANNER_LABELS.TITLE}
        </Typography>
      </BannerCard>
    </EventBannerSection>
  );
}

export default EventBanner;
