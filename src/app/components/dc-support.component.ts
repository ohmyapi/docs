import { Component } from '@angular/core';

@Component({
  selector: 'app-dc-support',
  standalone: true,
  imports: [],
  template: `
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <a href="https://t.me/ohmyapi" target="_blank" class="bg-gradient-to-r from-sky-600 to-sky-400 text-white rounded-btn flex flex-col justify-end gap-1 p-4 h-24 transition-all hover:shadow-xl">
        <span class="text-xs opacity-75">Telegram</span>
        <strong class="text-lg">&commat;ohmyapi</strong>
      </a>

      <a href="https://forms.gle/ozdrM5pNZnYcG1aN7" target="_blank" class="bg-gradient-to-r from-violet-500 to-violet-400 text-white rounded-btn flex flex-col justify-end gap-1 p-4 h-24 transition-all hover:shadow-xl">
        <span class="text-xs opacity-75">Google Form</span>
        <strong class="text-lg">Send your message</strong>
      </a>
    </div>
  `,
  host: {
    class: 'flex flex-col gap-2 w-full'
  }
})
export class DcSupportComponent {

}
