import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Ticket {
  id: string;
  name: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In progress' | 'Resolved';
  channel: 'Email' | 'Chat' | 'Social';
  initials: string;
  color: string;
  unread?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-shell">
      <aside class="sidebar" [class.sidebar-open]="mobileNavOpen">
        <a class="brand" href="#" aria-label="Kindred home">
          <span class="brand-mark"><svg viewBox="0 0 32 32" fill="none"><path d="M16 26s-10-5.7-10-13a5.4 5.4 0 0 1 10-2.8A5.4 5.4 0 0 1 26 13c0 7.3-10 13-10 13Z" fill="currentColor"/><path d="M10.7 16.1h3.1l1.4-3.1 2.1 6 1.3-2.9h2.7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <span class="brand-name">kindred<span>.</span></span>
        </a>
        <button class="workspace-switch"><span class="workspace-avatar">S</span><span class="workspace-copy"><strong>Studio North</strong><small>Free plan</small></span><svg class="chevron" viewBox="0 0 20 20"><path d="m6 8 4 4 4-4"/></svg></button>
        <div class="side-label">WORKSPACE</div>
        <nav class="main-nav" aria-label="Main navigation">
          <button *ngFor="let item of navigation" class="nav-item" [class.active]="activeNav === item.label" (click)="selectNav(item.label)">
            <span class="nav-icon" [innerHTML]="item.icon"></span><span>{{ item.label }}</span><span class="nav-count" *ngIf="item.count">{{ item.count }}</span>
          </button>
        </nav>
        <div class="side-label views-label">VIEWS <button class="tiny-plus" aria-label="Add view">+</button></div>
        <nav class="main-nav view-nav" aria-label="Ticket views">
          <button class="nav-item" *ngFor="let view of views" [class.active]="activeView === view.name" (click)="setView(view.name)"><span class="view-dot" [style.background]="view.color"></span><span>{{ view.name }}</span><span class="view-count">{{ view.count }}</span></button>
        </nav>
        <div class="sidebar-spacer"></div>
        <div class="upgrade-card"><div class="upgrade-spark">✳</div><strong>Make support feel personal</strong><p>Unlock automations and more with Pro.</p><button (click)="toast = 'Your Pro plan details are ready!'">Explore Pro <span>↗</span></button></div>
        <button class="profile-button"><span class="profile-avatar">AM</span><span class="profile-copy"><strong>Alex Morgan</strong><small>Admin</small></span><span class="profile-menu">···</span></button>
      </aside>

      <main class="main-area">
        <header class="topbar">
          <button class="mobile-menu" (click)="mobileNavOpen = !mobileNavOpen" aria-label="Toggle menu">☰</button>
          <div class="breadcrumb"><span>Inbox</span><span class="crumb-slash">/</span><strong>{{ activeNav }}</strong></div>
          <div class="top-actions"><div class="search-wrap"><svg viewBox="0 0 20 20"><circle cx="8.8" cy="8.8" r="5.6"/><path d="m13 13 4 4"/></svg><input aria-label="Search" [(ngModel)]="searchTerm" placeholder="Search anything..."/><kbd>⌘ K</kbd></div><button class="icon-button notification" aria-label="Notifications" (click)="toast = 'You’re all caught up!'">♧<i></i></button><button class="help-button" (click)="toast = 'Help center opened in a new panel.'">? <span>Help</span></button></div>
        </header>
        <div class="content-wrap">
          <section class="page-heading"><div><div class="eyebrow"><span class="eyebrow-dot"></span> WEDNESDAY, OCTOBER 28, 2026</div><h1>Good morning, Alex <span class="wave">✳</span></h1><p>Here’s what’s happening with your customers today.</p></div><button class="primary-button" (click)="openNewTicket()"><span>＋</span> Create ticket</button></section>

          <section class="stats-grid" aria-label="Support metrics">
            <article class="stat-card"><div class="stat-top"><span>Open conversations</span><span class="stat-icon lavender"><svg viewBox="0 0 24 24"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.7-3A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8 11h8M8 14h5"/></svg></span></div><div class="stat-value">{{ openCount }} <span class="stat-change positive">↘ 12%</span></div><div class="stat-note">vs. last week</div><div class="stat-spark spark-purple"><svg viewBox="0 0 160 36" preserveAspectRatio="none"><path d="M0 28 C12 26 12 15 26 20S43 30 52 17 68 13 78 20 94 26 104 13 120 17 130 10 148 16 160 4"/></svg></div></article>
            <article class="stat-card"><div class="stat-top"><span>Avg. first response</span><span class="stat-icon peach"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg></span></div><div class="stat-value">2.4<span class="value-unit"> hrs</span> <span class="stat-change positive">↘ 8%</span></div><div class="stat-note">vs. last week</div><div class="stat-spark spark-orange"><svg viewBox="0 0 160 36" preserveAspectRatio="none"><path d="M0 8 C13 15 14 7 25 17S42 13 51 22 68 14 77 26 91 16 102 22 117 12 128 19 146 11 160 5"/></svg></div></article>
            <article class="stat-card"><div class="stat-top"><span>Customer satisfaction</span><span class="stat-icon mint"><svg viewBox="0 0 24 24"><path d="M12 20s-8.5-4.7-8.5-11a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2c0 6.3-8.5 11-8.5 11Z"/></svg></span></div><div class="stat-value">98.2<span class="value-unit">%</span> <span class="stat-change positive">↗ 2.4%</span></div><div class="stat-note">vs. last week</div><div class="stat-spark spark-green"><svg viewBox="0 0 160 36" preserveAspectRatio="none"><path d="M0 26 C14 30 14 16 27 21S42 19 53 15 67 25 78 13 92 17 104 9 119 18 131 8 146 11 160 3"/></svg></div></article>
            <article class="stat-card"><div class="stat-top"><span>Resolved today</span><span class="stat-icon blue"><svg viewBox="0 0 24 24"><path d="m5 12 4.2 4.2L19 6.5"/></svg></span></div><div class="stat-value">{{ resolvedToday }} <span class="stat-change positive">↗ 18%</span></div><div class="stat-note">vs. last week</div><div class="stat-spark spark-blue"><svg viewBox="0 0 160 36" preserveAspectRatio="none"><path d="M0 31 C12 28 13 22 25 25S41 15 51 22 66 13 77 18 90 10 102 16 117 8 129 11 146 4 160 2"/></svg></div></article>
          </section>

          <section class="inbox-layout">
            <div class="ticket-panel">
              <div class="panel-heading"><div><h2>Conversations <span class="heading-count">{{ filteredTickets.length }}</span></h2><p>Your team’s latest customer conversations</p></div><button class="more-button" aria-label="More options" (click)="toast = 'Conversation options opened.'">···</button></div>
              <div class="ticket-toolbar"><div class="tabs"><button *ngFor="let tab of tabs" [class.selected]="activeTab === tab" (click)="setTab(tab)">{{ tab }}<span *ngIf="tab === 'Open'" class="tab-dot"></span></button></div><div class="toolbar-actions"><button class="filter-button" (click)="togglePriorityFilter()"><svg viewBox="0 0 20 20"><path d="M3 5h14M5.5 10h9M8 15h4"/></svg> Filter <span class="filter-active" *ngIf="priorityFilter">1</span></button><button class="sort-button" (click)="sortNewest = !sortNewest">↕ <span>Newest</span></button></div></div>
              <div class="ticket-list">
                <button class="ticket-row" *ngFor="let ticket of filteredTickets" [class.ticket-selected]="selectedTicket?.id === ticket.id" (click)="selectTicket(ticket)">
                  <span class="customer-avatar" [style.background]="ticket.color">{{ ticket.initials }}</span>
                  <span class="ticket-main"><span class="ticket-title-line"><strong>{{ ticket.name }}</strong><span class="ticket-time">{{ ticket.time }}</span></span><span class="ticket-subject">{{ ticket.subject }}</span><span class="ticket-preview">{{ ticket.preview }}</span><span class="ticket-tags"><span class="status-pill" [ngClass]="statusClass(ticket.status)"><i></i>{{ ticket.status }}</span><span class="priority-tag" [ngClass]="priorityClass(ticket.priority)">● {{ ticket.priority }}</span><span class="channel-tag">{{ ticket.channel === 'Email' ? '✉' : ticket.channel === 'Chat' ? '▤' : '◎' }} {{ ticket.channel }}</span></span></span>
                  <span class="unread-dot" *ngIf="ticket.unread"></span>
                </button>
                <div class="empty-state" *ngIf="filteredTickets.length === 0"><span>✳</span><strong>No conversations found</strong><p>Try adjusting your search or filters.</p></div>
              </div>
              <div class="list-footer"><span>Showing <strong>{{ filteredTickets.length }}</strong> of <strong>{{ tickets.length }}</strong> conversations</span><div><button disabled>←</button><button class="current-page">1</button><button (click)="toast = 'You’re viewing all available conversations.'">2</button><button (click)="toast = 'You’re viewing all available conversations.'">→</button></div></div>
            </div>

            <aside class="detail-column">
              <section class="detail-card selected-card" *ngIf="selectedTicket as ticket; else noSelection">
                <div class="detail-card-heading"><span class="live-status"><i></i> {{ ticket.status }}</span><button class="more-button" aria-label="Ticket actions" (click)="toast = 'Ticket actions opened.'">···</button></div>
                <div class="detail-customer"><span class="customer-avatar large" [style.background]="ticket.color">{{ ticket.initials }}</span><h3>{{ ticket.name }}</h3><a [href]="'mailto:' + ticket.email">{{ ticket.email }}</a><span class="customer-since">Customer since March 2023</span></div>
                <div class="detail-divider"></div>
                <div class="ticket-summary"><div class="summary-heading"><span>{{ ticket.id }}</span><span class="priority-tag" [ngClass]="priorityClass(ticket.priority)">● {{ ticket.priority }} priority</span></div><h3>{{ ticket.subject }}</h3><p>{{ ticket.preview }} We’re happy to help you get this sorted out. Could you share a little more detail so we can find the best solution?</p><div class="summary-meta"><span>✉ &nbsp;{{ ticket.channel }}</span><span>◷ &nbsp;{{ ticket.date }}</span></div></div>
                <div class="detail-divider"></div>
                <div class="assignment"><span class="assignment-label">ASSIGNED TO</span><div class="assignee"><span class="assignee-avatar">AM</span><span><strong>Alex Morgan</strong><small>Support team</small></span><button (click)="toast = 'Assignee selector opened.'">⌄</button></div></div>
                <div class="detail-actions"><button class="resolve-button" (click)="toggleResolved(ticket)">{{ ticket.status === 'Resolved' ? '↺ Reopen conversation' : '✓ Mark as resolved' }}</button><button class="reply-button" (click)="replyOpen = !replyOpen">↩ Reply</button></div>
                <div class="reply-composer" *ngIf="replyOpen"><textarea [(ngModel)]="replyText" placeholder="Write a reply to the customer..."></textarea><div><span>↗ Attach</span><button (click)="sendReply()">Send reply ↑</button></div></div>
              </section>
              <ng-template #noSelection><section class="detail-card no-selection"><span>✳</span><h3>Choose a conversation</h3><p>Select a customer conversation to view details and reply.</p></section></ng-template>
              <section class="team-card"><div class="team-card-top"><div><h3>Team availability</h3><p>Your team is on top of it</p></div><span class="available-indicator"><i></i> Online</span></div><div class="team-members"><div class="member-stack"><span class="member-avatar member-one">AM</span><span class="member-avatar member-two">JL</span><span class="member-avatar member-three">SK</span><span class="member-more">+2</span></div><span>5 agents online</span></div><div class="team-progress"><span></span></div><div class="team-foot"><span>Capacity used</span><strong>68%</strong></div></section>
            </aside>
          </section>
          <footer class="footer-note"><span>Made for the moments that matter <span class="footer-heart">♥</span></span><span>Kindred Support · v1.0</span></footer>
        </div>
      </main>
      <div class="toast" *ngIf="toast" role="status">{{ toast }}<button (click)="toast = ''">×</button></div>
      <div class="modal-backdrop" *ngIf="newTicketOpen" (click)="newTicketOpen = false"><section class="new-ticket-modal" (click)="$event.stopPropagation()"><div class="modal-head"><div><span class="modal-kicker">NEW CONVERSATION</span><h2>Create a ticket</h2></div><button (click)="newTicketOpen = false">×</button></div><label>Customer name<input [(ngModel)]="newTicketName" placeholder="e.g. Jamie Lee"/></label><label>Email address<input [(ngModel)]="newTicketEmail" type="email" placeholder="jamie@example.com"/></label><label>Subject<input [(ngModel)]="newTicketSubject" placeholder="What can we help with?"/></label><label>Message<textarea [(ngModel)]="newTicketMessage" placeholder="Add a few details..."></textarea></label><div class="modal-actions"><button class="cancel-button" (click)="newTicketOpen = false">Cancel</button><button class="primary-button" (click)="createTicket()">Create ticket <span>→</span></button></div></section></div>
    </div>
  `
})
export class AppComponent {
  activeNav = 'Overview';
  activeView = 'All conversations';
  activeTab = 'All';
  searchTerm = '';
  priorityFilter = false;
  sortNewest = true;
  selectedTicket: Ticket | null = null;
  mobileNavOpen = false;
  replyOpen = false;
  replyText = '';
  toast = '';
  newTicketOpen = false;
  newTicketName = '';
  newTicketEmail = '';
  newTicketSubject = '';
  newTicketMessage = '';
  tabs = ['All', 'Open', 'In progress', 'Resolved'];
  navigation = [
    { label: 'Overview', count: '', icon: '<svg viewBox="0 0 20 20"><rect x="3" y="3" width="5.5" height="5.5" rx="1"/><rect x="11.5" y="3" width="5.5" height="3.5" rx="1"/><rect x="11.5" y="8.5" width="5.5" height="8.5" rx="1"/><rect x="3" y="10.5" width="5.5" height="6.5" rx="1"/></svg>' },
    { label: 'Inbox', count: '12', icon: '<svg viewBox="0 0 20 20"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 3 14.5v-9Z"/><path d="M3.5 11h3l1.4 2h4.2l1.4-2h3"/></svg>' },
    { label: 'Customers', count: '', icon: '<svg viewBox="0 0 20 20"><circle cx="8" cy="6.5" r="3"/><path d="M2.8 16.5v-1.3A4.2 4.2 0 0 1 7 11h2a4.2 4.2 0 0 1 4.2 4.2v1.3M13 4a3 3 0 0 1 0 5.8m1.2 1.4a4 4 0 0 1 3 3.9v1.4"/></svg>' },
    { label: 'Analytics', count: '', icon: '<svg viewBox="0 0 20 20"><path d="M3 16.5V10m4.7 6.5V4m4.6 12.5V8m4.7 8.5V6"/></svg>' }
  ];
  views = [{ name: 'All conversations', count: '48', color: '#9b87e9' }, { name: 'Needs a reply', count: '12', color: '#ee9a72' }, { name: 'Following', count: '4', color: '#68bca2' }];
  tickets: Ticket[] = [
    { id: '#TK-2841', name: 'Olivia Rhye', email: 'olivia.rhye@email.com', subject: 'Order arrived damaged', preview: 'Hi there, my recent order arrived with a cracked screen...', time: '2m ago', date: 'Today, 10:42 AM', priority: 'High', status: 'Open', channel: 'Email', initials: 'OR', color: '#f3d8c7', unread: true },
    { id: '#TK-2840', name: 'Phoenix Baker', email: 'phoenix.baker@email.com', subject: 'Question about my subscription', preview: 'I was wondering if I could switch to the annual plan...', time: '18m ago', date: 'Today, 10:26 AM', priority: 'Medium', status: 'In progress', channel: 'Chat', initials: 'PB', color: '#e1d9f5', unread: true },
    { id: '#TK-2839', name: 'Lana Steiner', email: 'lana.steiner@email.com', subject: 'Can I update my delivery address?', preview: 'I just placed an order and noticed the address is old...', time: '46m ago', date: 'Today, 9:58 AM', priority: 'Low', status: 'Open', channel: 'Email', initials: 'LS', color: '#d4eadf' },
    { id: '#TK-2838', name: 'Demi Wilkinson', email: 'demi.wilkinson@email.com', subject: 'Discount code not working', preview: 'The WELCOME15 code does not seem to apply at checkout...', time: '1h ago', date: 'Today, 9:35 AM', priority: 'Medium', status: 'Open', channel: 'Social', initials: 'DW', color: '#f1dce3', unread: true },
    { id: '#TK-2837', name: 'Candice Wu', email: 'candice.wu@email.com', subject: 'Invoice for my last purchase', preview: 'Could you please send me a copy of the invoice for...', time: '2h ago', date: 'Today, 8:54 AM', priority: 'Low', status: 'Resolved', channel: 'Email', initials: 'CW', color: '#d9e4f3' },
    { id: '#TK-2836', name: 'Natali Craig', email: 'natali.craig@email.com', subject: 'Product availability question', preview: 'Will the olive color be back in stock soon? I would...', time: '3h ago', date: 'Today, 8:14 AM', priority: 'Low', status: 'In progress', channel: 'Chat', initials: 'NC', color: '#eee4ce' }
  ];

  constructor() { this.selectedTicket = this.tickets[0]; }
  get filteredTickets(): Ticket[] {
    const query = this.searchTerm.trim().toLowerCase();
    let result = this.tickets.filter(ticket => {
      const matchesTab = this.activeTab === 'All' || ticket.status === this.activeTab;
      const matchesQuery = !query || `${ticket.name} ${ticket.email} ${ticket.subject} ${ticket.preview}`.toLowerCase().includes(query);
      return matchesTab && matchesQuery && (!this.priorityFilter || ticket.priority === 'High');
    });
    return this.sortNewest ? result : [...result].reverse();
  }
  get openCount(): number { return this.tickets.filter(ticket => ticket.status === 'Open' || ticket.status === 'In progress').length; }
  get resolvedToday(): number { return this.tickets.filter(ticket => ticket.status === 'Resolved').length + 23; }
  selectNav(label: string): void { this.activeNav = label; this.mobileNavOpen = false; if (label === 'Inbox') this.activeTab = 'All'; }
  setView(name: string): void { this.activeView = name; this.activeTab = 'All'; }
  setTab(tab: string): void { this.activeTab = tab; }
  selectTicket(ticket: Ticket): void { this.selectedTicket = ticket; ticket.unread = false; this.replyOpen = false; }
  togglePriorityFilter(): void { this.priorityFilter = !this.priorityFilter; }
  statusClass(status: string): string { return status.toLowerCase().replace(' ', '-'); }
  priorityClass(priority: string): string { return priority.toLowerCase(); }
  toggleResolved(ticket: Ticket): void { ticket.status = ticket.status === 'Resolved' ? 'Open' : 'Resolved'; this.toast = ticket.status === 'Resolved' ? 'Conversation marked as resolved.' : 'Conversation reopened.'; }
  sendReply(): void { if (!this.replyText.trim()) { this.toast = 'Write a reply before sending.'; return; } this.toast = 'Reply sent to ' + (this.selectedTicket?.name ?? 'customer') + '.'; this.replyText = ''; this.replyOpen = false; }
  openNewTicket(): void { this.newTicketOpen = true; }
  createTicket(): void {
    if (!this.newTicketName.trim() || !this.newTicketEmail.trim() || !this.newTicketSubject.trim()) { this.toast = 'Add a name, email and subject to create a ticket.'; return; }
    const name = this.newTicketName.trim();
    const initials = name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();
    const ticket: Ticket = { id: '#TK-' + (2842 + this.tickets.length - 6), name, email: this.newTicketEmail.trim(), subject: this.newTicketSubject.trim(), preview: this.newTicketMessage.trim() || 'No message preview available.', time: 'Just now', date: 'Today, just now', priority: 'Medium', status: 'Open', channel: 'Email', initials, color: '#dce8e2', unread: true };
    this.tickets = [ticket, ...this.tickets]; this.selectedTicket = ticket; this.activeTab = 'All'; this.searchTerm = ''; this.newTicketOpen = false; this.newTicketName = ''; this.newTicketEmail = ''; this.newTicketSubject = ''; this.newTicketMessage = ''; this.toast = 'Ticket created successfully.';
  }
}

bootstrapApplication(AppComponent).catch(error => console.error(error));
