<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payers_dme_providers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payer_id')->constrained('payers');
            $table->foreignId('dme_provider_id')->constrained('dme_providers');
            $table->unsignedBigInteger('data_sync_id')->nullable();
            $table->foreign('data_sync_id')->references('id')->on('data_syncs')->onDelete('set null');
            $table->string('state');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payers_dme_providers');
    }
};
