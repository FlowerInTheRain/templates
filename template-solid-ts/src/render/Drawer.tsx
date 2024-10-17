import MailIcon from "@suid/icons-material/Mail";
import InboxIcon from "@suid/icons-material/MoveToInbox";
import {
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@suid/material";

export default function TemporaryDrawer({isDrawerOpen, closeDrawer}) {
    console.log(isDrawerOpen)

    const list = (anchor: string) => (
        <Box
            sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
            role="presentation"
        >
            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>

                    <Drawer
                        anchor={"left"}
                        open={isDrawerOpen()}
                        sx={{ zIndex: 9999 }}
                        onClose={() => closeDrawer()}
                    >
                        {list("left")}
                    </Drawer>
        </div>
    );
}
