import { CheckCircle2, DollarSign, Mail, Reply } from 'lucide-react';
import { CaseStudyData } from '../types';

export const arulCaseStudyData: CaseStudyData = {
  hero: {
    title: '6 Clients in First Month | Migrated from Competitor Tool',
    description: [
      'Arul has been on Upwork for a long time, starting as a solo freelancer and then growing his business to managing a full team.',
      "He's tried every approach when it comes to Upwork Outreach, and they've all failed him - up until lancer.app.",
      'When we connected Arul had just subscribed to a different tool which he was not happy with. 2 weeks into the 3 month plan he migrated to Lancer on a free trial.',
      '2 weeks later he had 2 clients, by the end of the month he had closed 6 clients.',
    ],
  },
  stats: {
    title: "📈 Arul's Upwork Funnel Stats",
    cards: [
      {
        label: 'Open Rate',
        value: '24.5%',
        icon: Mail,
        iconColor: '#60a5fa',
        iconBgColor: 'rgba(59, 130, 246, 0.2)',
        barColor: '#3b82f6',
      },
      {
        label: 'Reply Rate',
        value: '13.2%',
        icon: Reply,
        iconColor: '#4ade80',
        iconBgColor: 'rgba(34, 197, 94, 0.2)',
        barColor: '#22c55e',
      },
      {
        label: 'Contracts/Month',
        value: '6',
        icon: CheckCircle2,
        iconColor: '#a78bfa',
        iconBgColor: 'rgba(167, 139, 250, 0.2)',
        barColor: '#a78bfa',
      },
    ],
    fullWidthCard: {
      label: 'Replies Per Week',
      value: '7-14',
      icon: DollarSign,
      iconColor: '#fb923c',
      iconBgColor: 'rgba(251, 146, 60, 0.2)',
      barColor: '#fb923c',
    },
  },
  content: [
    {
      type: 'heading',
      heading: 'Migrating From A Different Tool',
      level: 2,
    },
    {
      type: 'paragraph',
      content:
        'When we first started talking Arul had committed to a 3 month plan with a different tool which 2 weeks in was failing him.',
    },
    {
      type: 'paragraph',
      content:
        'Spending connects bidding on the wrong jobs, missing the correct high quality jobs, etc.',
    },
    {
      type: 'image',
      image: {
        src: 'https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/6a0bfda45502764e52a4ecacd8155d9c?response-content-disposition=inline%3B%20filename%3D%22image_original%22%3B%20filename%2A%3Dutf-8%27%27image_original&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCYhCexSXe4CEB1lIL3iQHl8gC67xduTm%2BjlWh7YnaRSAIhAMJNWD7lSDp7olyOHyK3ky2RVNI202%2BekIrHW2zvDptPKpsFCIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNzM5OTM5MTczODE5IgwJO6wfqIetIt7qKSIq7wRrij15D4XuU7FSwlbL4GQeOGvOvW8bD5nu%2B5nlVoqqJwj%2BjH5NWgYN%2FPWuHAavIcSrLXBmtf6Qt4HSo4DseLy9Qk9vGEpPJ52EpqfdzmhH4WcbSs8%2BTmllowSmEbv8vu247FXMLuGQmGEld7YfoVwdInDjJjOpPc6bK7yWmF8A1UgpEApw7%2BqDMlK55TYac5fxe9uRbe9ZY2GUfx3v3JQxFK6Q0M8VkdhkZusEfLAeZ3B6GPD%2F3xzzdBQbnpDNPm1wYG400JLZMtxNfcEziHU%2FmoodbNbPxADZgOR5enicEwkrXtoCj66ddc92QJb1YUdikqoWzZqiLkJPDhX1LLa1IfwsACLjqmmBadlZqFdvpkHchAtkK5ydVfKsqUZvqX6AEy5ULHxxBrrbZ%2FYxxguUl70qbA%2BgyGA2Z5rChKHpG77slcO0I7Rf%2BDWZDCDuLC5jQIB02nL1%2BCIQwMxagCCWwX9faR9k1%2FnB6Ga2b%2FP111g%2F27%2BcloCbS5LEmxlj9iAuI3TTFrN9mNopv9Et2ObA4E54yRP%2B9Jk2M48NmryAHBUT6ZybPV9T3fHjJ%2FY6eDrdPd7UGX1FoP7hD090WkOb01mwWq%2BimlJny3WScEZ%2BzNks8pHZzFrlBd8jB5qZDUt4fKxQjSbVeqpl8etCUOYSsVUB54Ew67apLWIjUUo3sVMiGyxeEGfQdZipbRVFXJ1xUDEdfaG3HFKF8s63jJtIxlRxMV%2BHBjrLhXD1Oh8VSGTR7L9Cn1l0iwT8vbP%2F1Ngxs%2BrWn3LavwrKrfyUEL6Dvb05WXrF94XREFRsnX45UbyK7vnkjUAZ7hdyxt2qzDDp0KvIBjqYAeZkoq5K%2Bal%2BygHc56A9htxF5YbZqdoCCIN21kVSXe8LjapTF8Fjkfs%2B5N%2BhBPcEJHvH8s3x3sGgTNqaA%2FqUVWTnuCFkidNyRSicmTnZzkClcgRsO6sqLrmOVfDxSPLkU41qt48vTYJ%2FHppKORv9Fhevar%2BsmGtmEmjMMF0xDSG5gGLaZiwVsGxszJuuD%2FUZWabA8qDQciDL&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251105T063500Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5WDX4ZCVP%2F20251105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=039b2d297c417f0351842101d003cd0ae0c452eb557424036fb6516c9075a77f',
        alt: 'Arul results',
        width: 1000,
        height: 1000,
      },
    },
    {
      type: 'paragraph',
      content:
        'So we arranged a 2-week free trial for him to see the difference. These were the results 👇',
    },
    {
      type: 'image',
      image: {
        src: 'https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/e3c644882bfb4be363a3fa1ad4b79587?response-content-disposition=inline%3B%20filename%3D%22image_original%22%3B%20filename%2A%3Dutf-8%27%27image_original&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGNLdsngCNicOTVfL1oafHp2ralOyA4tOGGF%2B%2BncHXNbAiEAnY8363ky%2FlPLNVF6o1NnLZbJ5vQP2m4gLJl7SVvCtS8qmwUIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3Mzk5MzkxNzM4MTkiDHtpgy7iMW5ao8nm2irvBKVH03HlDaL4LrmC8ZWz16KO9KmHudt0F6r%2BhdvX2ODwRcRyad1fI7eS5TxenGUWeuI%2FegPNycEEFnGG9Ws4UHODZOcZUgRa%2B8xi%2BvDyRrG3fjZ5NIScQfXJPAecWkQB6vMdctyUNpdHsacAZ%2FpsxG%2BZFnjZpX7%2BV%2BbRqhJtyh1KMvL7Da555f8VgvBT0Jahv5UrSEJho0m6pubySNT%2Fq2rImej%2BvEYn2Ch0S%2BgGDqmdBuGcfvSSfZkMXT4T7MtBZ%2B%2FZGOnFIGoWzNOxHj0xHlDTE%2BMu0g9%2FAjjbHiujtQaf8AQGsJVNeBpPynQ5TKqj8kYwS5uYnj5klQ%2BiTBSCZornp5Be539iT%2Brrn8FlC7Rl6O6hM4JEDvDRT7oRQPo42VJXspNjudmpmvqefbtNxc4n2sRlqErm5wjRNplQLwqJnoQKCCTOitVHgVbGix9Xr769d%2FTJl0RdH5F%2BQt1UORGaTZoYe3Lad0xbmVFL%2By7Pg2Om7gpT1g9akauNHRW4g1vn7CveZYr%2Fnc9Gr%2BSUob30fveLyk3d7rRRqNb0bVi3yua0y1nUKEbR8LR0nGc7Qh5awHp3xv38nT8USt7Y9x4JDATd07AJY9XSb6e072%2FHKIwPuu0hvHa46GgAs76algtjrQ%2FDZtJoO%2FShenuciCrmrQHDvQc7boNNm88wXE%2F7H%2BIYhrzxqxDLhpWedDqECUDV3ctfT25%2B%2By5WFplQDHwZFXfrR3H0gJINwkXK0ah3XODTYyJBC8aJ%2FP74%2BVjWpcJmnlL9QCeEKu4bhwwp5yCgR3TXDTixtG72dvGrxE4wj4di1cOUn7XlHtCjkeNUMOzZq8gGOpkBD2VxC5WVs0wKEMpfEliv9oF9Zt2H%2F3crwWPwnneUPwGY2I9Qohnr45%2BdR4iLf3iGcScOMxu9Kk2lc2ApNUASE6q0h29s8TO92yk%2FRX7PTzdX0fLfG08whg43IfdBNSWSLhcPj02R18PShON4%2BCfgYh1XPh4bTXszuzh7n%2BjLyfIaz8G%2B1o4JMtrT4WG%2F1U93lPzCu4ZjrTRL&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251105T063515Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW57SE4XQEF%2F20251105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=e9227bb110a38aa4bf8467114edc3e448931f3eb4bc455918668aebe28c546d9',
        alt: 'Arul results',
        width: 1000,
        height: 1000,
      },
    },

    {
      type: 'image',
      image: {
        src: 'https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/e65e6629083e350104f82dc51f779e22?response-content-disposition=inline%3B%20filename%3D%22image_original%22%3B%20filename%2A%3Dutf-8%27%27image_original&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCHjM7Ti%2B6Wcvpu0%2Bk1bvhdn9hgZWivJkbsnEwg3VMipQIgdB%2Ff1pZTv52uWXBEpl52Hix0E%2BllnJ4h8zPML%2F8G0lIqmwUIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3Mzk5MzkxNzM4MTkiDOm9ohuY%2B%2BsIMufw2irvBOhgC5DFZaXLCUFFI%2BwjCvLhw4zFqROJVqpczKixwwSM2Zf39aI4xEttw9%2FWr%2BtyYwJMI0TopcAO0l1SRt%2FoH6b91IaanWrWaDkVIaoZWefqUnyAngbMqxeeYRZ7dJVSR%2FMki9NzBjeA9l1ZttKDHTrLX6ro5h2sblrZ0IbK514nhepIxTiryfJUYb7R%2B4L65oa%2F6dGQuj8RtRhFC71vTBMN0%2Fvub6%2BILSS1wNK%2BYgTNxG68gnv2qhgREU9HtBvS1j511MemQodabxwv5Eu7jZBCJKL81Nj4hpKW%2BzxYp1LdGI7Ag39qtYvHmikIrHebCbE6coTkuC%2BpQCKw4PTz31EbqHM8NmQpE304XR1oi25eP4ENx8ZLla06q%2BzhSgfL9l%2ByfH%2B3BWdl8W%2Fi%2FzvMXcfN7AjPOL%2BO1f4xaKGhqMqd8dmL6DYDRiXbU6WB13oMq085TGuJy6JtteJGTlghdhn02K87ZlEVUcDyuAP2lYbtPS%2BmII%2BM61%2BnlEIQIunlW1h2NUROYV%2FIyyffF%2Bhdkoth4DG33Ub94hN697yjSX3zJX%2BYi3t%2F4qhermfLUeoyjCylTk6xpaso1LkEL1Zhlf3fRXwuO4yhfyXuToBZ1I0G75o2N%2BeW4WjUue3iiLKVvY6RZnw3zYpjv9IjxusH5RBfhcOGdJwXXdbbvLSk%2Bz60jcCf90o8k7DS7BKAPtkuaJ56IMdhjAsJh0xRKqvunhUwzkUf6ZjhKzYj9XLU5sBItHVDZknLK3vm1CSuZ8M2jNMnT7qUbAL%2BSHzHZwjUgDkRovAn4PcRXGs1hb4aKsxY4GD2IY7X95nNg%2FwfCUSIMIfdq8gGOpkB9EUDY2axLfhAfuulEWM3aAG0AWSsamq7OHgywle6viuuzWFGgyt9AoJVayc0c5T7SsA1t6yGDoFg%2Fbrw9yvpp9VIoYBtke75nBS%2BgcDwv%2BjL0ERREXsB8bzn%2B8tJnQUYHcBdbj9oVV%2F%2FKWO1ISYvk5KYn6giIU9SgZ0VMKUa6StLF%2FjJov5ixZl4APbcXwAq64zFQuWicCag&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251105T063603Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5VK3SCSO7%2F20251105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=8d6a924dcb3adbbf6b1f42b5189a9d5255e1e5bfe49932b7bf7191da2a205a60',
        alt: 'Arul results',
        width: 1000,
        height: 1000,
      },
    },
    {
      type: 'paragraph',
      content:
        'So unfortunately he is now paying for two tools in parallel but only using one 😅',
    },
    {
      type: 'paragraph',
      content: "We gave him a good deal though, don't worry.",
    },
  ],
  meta: {
    publishedDate: 'Sep 7, 2025',
  },
};
