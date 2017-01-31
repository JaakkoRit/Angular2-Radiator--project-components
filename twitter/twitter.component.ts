import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { PanelContentBase } from '../panel-content-base';
import { InputFieldInput } from '../shared/inputs';
import { EditDataService } from '../shared/edit-data.service';
import { DashboardPanelContentEditData } from '../shared/edit-datas';

interface TwitterOptions {
  account: string;
}

@Component({
  selector: 'radiator-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent extends PanelContentBase implements OnInit, OnChanges {

  @Input() id: number;
  @Input() name: string;
  @Input() options: TwitterOptions;
  @Input() isNew: boolean;

  @ViewChild('twitterContainer') twitterContainer: ElementRef;

  private twitterScript: HTMLScriptElement;
  private twitterUrl: string;
  private previousAccount: string;
  private twitterBaseUrl = 'https://twitter.com/';
  private anchorElement: HTMLAnchorElement;

  constructor(private editDataService: EditDataService) {
    super();
  }

  private createScript() {
    this.twitterScript = document.createElement('script');
    this.twitterScript.type = 'text/javascript';
    this.twitterScript.id = `twitter-script-${this.id}`;
    this.twitterScript.src = '//platform.twitter.com/widgets.js';
  }

  ngOnInit() {
    this.constructTimeline();
    if (this.isNew) {
      this.editDataService.selectEditData(this.buildEditData());
    }
  }

  ngOnChanges() {
    this.constructTimeline();
  }

  private createAnchorElement() {
    this.anchorElement = document.createElement('a');
    this.anchorElement.setAttribute('class', 'twitter-timeline');
    this.anchorElement.setAttribute('href', this.twitterUrl);
  }

  private constructTimeline() {
    if (this.previousAccount !== this.options.account) {
      this.twitterUrl = this.twitterBaseUrl + this.options.account;
      if (this.twitterScript) {
        this.twitterScript.remove();
      }
      this.createScript();
      let twitterContainerDiv = this.twitterContainer.nativeElement;
      while (twitterContainerDiv.hasChildNodes()) {
        twitterContainerDiv.removeChild(twitterContainerDiv.firstChild);
      }
      this.createAnchorElement();
      twitterContainerDiv.appendChild(this.anchorElement);
      twitterContainerDiv.appendChild(this.twitterScript);
      this.previousAccount = this.options.account;
    }
  }

  editModeActivated() {
    this.editDataService.selectEditData(this.buildEditData());
  }

  private buildEditData() {
    return new DashboardPanelContentEditData(
      this.id,
      [new InputFieldInput({key: 'name', label: 'Name', required: true, value: this.name}),
       new InputFieldInput({key: 'account', label: 'Twitter account', required: true, value: this.options.account})]
    );
  }
}
